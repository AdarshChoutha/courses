import socket

def banner(ip_address, port):
    try:
        port = int(port)
        _socket = socket.socket()
        _socket.connect((ip_address, port))
        print(_socket.recv(1024))
    except:
        print(f'Invalid integer value for Port: {port}')

def main():
    ip_address = input('Please enter the IP Address: ')
    port = input('Please enter the Port: ')
    banner(ip_address, port)

main()