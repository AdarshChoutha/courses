import hashlib

def crack_sha1_hash(hash, use_salts=False):
    # Load passwords
    with open("top-10000-passwords.txt", "r") as f:
        passwords = [line.strip() for line in f.readlines()]

    # Load salts only if needed
    salts = []
    if use_salts:
        with open("known-salts.txt", "r") as f:
            salts = [line.strip() for line in f.readlines()]

    for password in passwords:
        # No salt case
        if not use_salts:
            hashed = hashlib.sha1(password.encode()).hexdigest()
            if hashed == hash:
                return password

        # Salted case
        else:
            for salt in salts:
                # salt + password
                salted_hash = hashlib.sha1((salt + password).encode()).hexdigest()
                if salted_hash == hash:
                    return password

                # password + salt
                salted_hash = hashlib.sha1((password + salt).encode()).hexdigest()
                if salted_hash == hash:
                    return password

    return "PASSWORD NOT IN DATABASE"