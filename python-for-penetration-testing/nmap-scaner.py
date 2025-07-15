import nmap

scanner = nmap.PortScanner()

print('Welcome, this is a simple nmap automation tool')
print('<-- ---------- ---------- ---------- ---------- -->')

ip_address = input('Please enter the IP address you want to scan: ')
print(f'The IP address you entered is: {ip_address}')
type(ip_address)

resp = input("""
Please enter the type of scan you want to run
    1) SYN SCK Scan
    2) UDP Scan
    3) Comprehensive Scan
""")
print(f'You have selected option: {resp}')

if resp == '1':
    print(f'Nmap Version: {scanner.nmap_version()}')
    scanner.scan(ip_address, '1-1024', '-v -sS')
    print(scanner.scaninfo())
    print('IP Status: ', scanner[ip_address].state())
    print(scanner[ip_address].all_protocols())
    print('Open Ports: ', scanner[ip_address]['tcp'].keys())
elif resp == '2':
    print(f'Nmap Version: {scanner.nmap_version()}')
    scanner.scan(ip_address, '1-1024', '-v -sU')
    print(scanner.scaninfo())
    print('IP Status: ', scanner[ip_address].state())
    print(scanner[ip_address].all_protocols())
    print('Open Ports: ', scanner[ip_address]['udp'].keys())
elif resp == '3':
    print(f'Nmap Version: {scanner.nmap_version()}')
    scanner.scan(ip_address, '1-1024', '-v -sS -sV -sC -A -O')
    print(scanner.scaninfo())
    print('IP Status: ', scanner[ip_address].state())
    print(scanner[ip_address].all_protocols())
    print('Open Ports: ', scanner[ip_address]['tcp'].keys())
else:
    print('Please enter a valid option')