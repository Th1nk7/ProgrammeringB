# Importer library
from Crypto.Util.number import getPrime, inverse, bytes_to_long, long_to_bytes

# Sæt bit_size til 1024 som udggangspunkt.
def generate_keys(bit_size=1024):
    # Vælg to store primtal p og q
    p = getPrime(bit_size // 2)
    q = getPrime(bit_size // 2)
    n = p * q # Modulus
    phi = (p - 1) * (q - 1) # Carmichael's totient funktion
    e = 65537 # Offentlig eksponent e, som typisk er 65537
    # Beregn den private eksponent
    d = inverse(e, phi) # Modular invers af e mod phi

    return (e, n), (d, n) # Returner offentlig og privat nøgle i sæt

def rsa_encrypt(public_key, pt: str):
    e, n = public_key
    # Lav om til heltal (integer)
    pt_int = bytes_to_long(pt.strip().encode())
    # Find CT ved at kryptere PT
    ct = pow(pt_int, e, n)
    return ct

def rsa_decrypt(private_key, ct):
    d, n = private_key
    # Dekrypter CT for at få tal-versionen (integer) af PT
    pt_int = pow(ct, d, n)
    # Konverter PT tal-version tilbage til tekst
    pt = long_to_bytes(pt_int)
    return pt

if __name__ == '__main__':
    while True:
        print('===== RSA maskinen =====\n'
          '\n'
          '0: Generer nøgler\n'
          '1: Krypter\n'
          '2: Dekrypter\n'
          '3: Forlad\n'
          )
        match input('> '):
            case '0':
                public_key, private_key = generate_keys(1024)
                print('\n'
                    f'============================== NØGLEVÆRDIER ==============================\n'
                    f'Modulu n: {str(public_key[1])}\n\n'
                    f'Offentlig eksponent e: {str(public_key[0])}\n\n'
                    f'Privat eksponent d: {str(private_key[0])}\n'
                    )
            case '1':
                public_key = (int(input('Indtast e: ').strip()), int(input('Indtast n: ').strip()))
                pt = input('Indtast besked: ')
                ct = rsa_encrypt(public_key, pt)
                print('\n'
                    f'============================== KRYPTERET ==============================\n'
                    f'Krypteret besked CT: {str(ct)}\n'
                    )
            case '2':
                private_key = (int(input('Indtast d: ').strip()), int(input('Indtast n: ').strip()))
                ct = int(input('Indtast CT: ').strip())
                pt = rsa_decrypt(private_key, ct)
                print('\n'
                    f'============================== DEKRYPTERET ==============================\n'
                    f'Dekrypteret besked PT: {pt.decode()}\n'
                    )
            case '3':
                print('Farvel')
                exit()
            case _:
                print('Ugyldig')
    
    