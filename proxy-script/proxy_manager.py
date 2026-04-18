#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
代理管理脚本
功能：
1. 搜索GitHub代理主机
2. 筛选延迟最低的10个
3. 每小时更新代理池
4. 按日期/小时保存
5. 用户确认更换代理
"""


import os
import sys
import time
import json
import subprocess
import platform
from datetime import datetime
from urllib.parse import urlparse
import socket
import threading

try:
    import requests
except ImportError:
    print("正在安装依赖...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests

class ProxyManager:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.proxy_list = []
        self.best_proxies = []
        
    def get_date_str(self):
        return datetime.now().strftime("%Y-%m-%d")
    
    def get_datetime_str(self):
        return datetime.now().strftime("%Y-%m-%d_%H")
    
    def get_proxy_dir(self):
        date_dir = os.path.join(self.base_dir, self.get_date_str())
        if not os.path.exists(date_dir):
            os.makedirs(date_dir)
        return date_dir
    
    def get_proxy_file_path(self):
        return os.path.join(self.get_proxy_dir(), f"{self.get_datetime_str()}.json")
    
    def ping_host(self, host, port=80, timeout=3):
        try:
            start_time = time.time()
            sock = socket.create_connection((host, port), timeout=timeout)
            sock.close()
            return (time.time() - start_time) * 1000
        except:
            return float('inf')
    
    def fetch_proxies(self):
        print("正在获取代理列表...")
        proxy_sources = [
            "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
            "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
            "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt"
        ]
        
        proxies = []
        for url in proxy_sources:
            try:
                print(f"正在从 {url} 获取...")
                response = requests.get(url, timeout=10)
                if response.status_code == 200:
                    lines = response.text.strip().split('\n')
                    for line in lines:
                        line = line.strip()
                        if ':' in line:
                            proxies.append(line)
            except Exception as e:
                print(f"获取失败: {e}")
                continue
        
        return list(set(proxies))
    
    def test_proxies(self, proxies):
        print(f"\n开始测试 {len(proxies)} 个代理...")
        results = []
        
        def test_single(proxy):
            try:
                if '@' in proxy:
                    proxy = proxy.split('@')[-1]
                host_port = proxy.split(':')
                if len(host_port) >= 2:
                    host = host_port[0]
                    port = int(host_port[1])
                    latency = self.ping_host(host, port)
                    if latency < float('inf'):
                        results.append({
                            'proxy': proxy,
                            'latency': latency,
                            'host': host,
                            'port': port
                        })
                        print(f"✓ {proxy} - {latency:.2f}ms")
            except:
                pass
        
        threads = []
        for proxy in proxies:
            t = threading.Thread(target=test_single, args=(proxy,))
            threads.append(t)
            t.start()
            if len(threads) % 20 == 0:
                time.sleep(0.5)
        
        for t in threads:
            t.join()
        
        return sorted(results, key=lambda x: x['latency'])
    
    def save_proxies(self, proxies):
        file_path = self.get_proxy_file_path()
        data = {
            'timestamp': datetime.now().isoformat(),
            'proxies': proxies
        }
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\n代理已保存到: {file_path}")
        return file_path
    
    def display_proxies(self, proxies):
        print("\n" + "="*60)
        print("延迟最低的10个代理:")
        print("="*60)
        for i, p in enumerate(proxies[:10], 1):
            print(f"{i}. {p['proxy']} - {p['latency']:.2f}ms")
        print("="*60 + "\n")
    
    def set_system_proxy(self, proxy):
        system = platform.system()
        
        if system == 'Windows':
            host, port = proxy['host'], proxy['port']
            try:
                import winreg
                key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, 
                                     r'Software\Microsoft\Windows\CurrentVersion\Internet Settings', 
                                     0, winreg.KEY_SET_VALUE)
                winreg.SetValueEx(key, 'ProxyEnable', 0, winreg.REG_DWORD, 1)
                winreg.SetValueEx(key, 'ProxyServer', 0, winreg.REG_SZ, f"{host}:{port}")
                winreg.CloseKey(key)
                print(f"Windows代理已设置: {host}:{port}")
                return True
            except Exception as e:
                print(f"设置Windows代理失败: {e}")
                return False
        
        elif system == 'Linux':
            print("\nLinux系统代理设置:")
            print(f"export http_proxy=http://{proxy['proxy']}")
            print(f"export https_proxy=http://{proxy['proxy']}")
            print("\n或在系统设置中手动配置")
            return True
        
        elif system == 'Darwin':
            print("\nmacOS系统请在网络设置中手动配置代理")
            return True
        
        return False
    
    def run(self):
        print("="*60)
        print("GitHub代理管理脚本")
        print("="*60)
        
        while True:
            print("\n" + "-"*60)
            print(f"当前时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            
            proxies = self.fetch_proxies()
            if not proxies:
                print("未获取到代理，10分钟后重试...")
                time.sleep(600)
                continue
            
            tested_proxies = self.test_proxies(proxies)
            if not tested_proxies:
                print("没有可用的代理，10分钟后重试...")
                time.sleep(600)
                continue
            
            self.best_proxies = tested_proxies[:10]
            self.display_proxies(self.best_proxies)
            self.save_proxies(self.best_proxies)
            
            choice = input("\n是否使用延迟最低的代理? (y/n, 默认n, 输入q退出): ").strip().lower()
            
            if choice == 'q':
                print("退出程序")
                break
            elif choice == 'y':
                if self.best_proxies:
                    self.set_system_proxy(self.best_proxies[0])
            
            print("\n等待1小时后更新代理池... (按Ctrl+C退出)")
            try:
                for i in range(3600):
                    time.sleep(1)
                    if (i + 1) % 300 == 0:
                        print(f"已等待 {i + 1} 秒...")
            except KeyboardInterrupt:
                print("\n用户中断，退出程序")
                break

def main():
    manager = ProxyManager()
    manager.run()

if __name__ == "__main__":
    main()
