import socket

port_scanner = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
port_scanner.settimeout(5)

host = input("Please enter the IP Address you want to scan: ")
port = int(input("Please enter the Port you want to scan: "))


def portScanner(port):
    if port_scanner.connect_ex((host, port)):
        print("The port is closed")
    else:
        print("The port is open")


portScanner(port)
