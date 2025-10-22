import socket
import ipaddress

def get_open_ports(target, port_range, verbose = False):
    open_ports = []
    ret_str = ''

    # Ensure port_range is a 2-tuple/list
    try:
        start = int(port_range[0])
        end = int(port_range[1])
    except Exception:
        raise ValueError("port_range must be (start, end)")

    if start < 0 or end < 0 or start > 65535 or end > 65535 or start > end:
        raise ValueError("invalid port range")
    
    # Resolve hostname (allow passing an IP directly)
    try:
        addr = socket.gethostbyname(target)
    except socket.gaierror:
        # If resolution fails, determine whether the input was meant as an IP or a hostname
        try:
            ipaddress.ip_address(target)
            # Target is an IP but resolution failed
            return "Error: Invalid IP address"
        except ValueError:
            # Not a valid IP, so treat as invalid hostname
            return "Error: Invalid hostname"

    for port in range(start, end + 1):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1.0)
        try:
            res = s.connect_ex((addr, port))
            if res == 0:
                try:
                    service = socket.getservbyport(port, "tcp")
                except OSError:
                    service = "unknown"
                open_ports.append((port, service))
        finally:
            s.close()

    # If verbose, print header and table of open ports only
    if verbose:
        target_name = target if f"{target}" == f"{addr}" else f"{target} ({addr})"
        ret_str += f"Open ports for {target_name}"
        ret_str += "\nPORT     SERVICE"
        for port, service in open_ports:
            ret_str += f"\n{port}      {service}"

    # Return just port numbers to keep original semantics
    return ret_str if verbose else [p for p, _ in open_ports]