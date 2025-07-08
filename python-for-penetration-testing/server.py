import socket

# Create socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

host = socket.gethostname()
port = 3050

# Bind socket
server_socket.bind((host, port))

# Start TCP listener
server_socket.listen(2)

while True:
    client_socket, address = server_socket.accept()

    # print('Received connection from %s ' % str(address))
    print(f'Received connection from {str(address)}')

    message = 'Thank you for connecting to the server \r\n'

    client_socket.send(message.encode('ascii'))

    client_socket.close()