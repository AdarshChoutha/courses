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