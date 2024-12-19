# Importer library
from Crypto.Cipher import DES
from Crypto.Random import get_random_bytes

# Få nøglen i bytes
def getKey():
    print('Nøglelængde: 8 bytes (8 tegn for ASCII eller 16 tegn for hex)')
    print('Eksempel: Småkager = 536DE56B61676572')
    keyString = input('Indtast nøgle: ').strip()
    
    # Tjek om der er brugt hex eller bytes format og lav string om til rigtig format
    # key[:8].ljust(8, b'\0') sikrer at antallet af bytes er rigtig
    match len(keyString):
        case 8:
            try:
                key = keyString.encode()
            except:
                print('Fejl: Ukendt')
                key = get_random_bytes(8)
                print(f'Tilfældig nøgle bruges. Nøgle i hex format: {key.hex()}')
            return key[:8].ljust(8, b'\0')
        case 16:
            try:
                key = bytes.fromhex(keyString)
            except:
                print('Fejl: Nøgle er ikke i hex format')
                key = get_random_bytes(8)
                print(f'Tilfældig nøgle bruges. Nøgle i hex format: {key.hex()}')
            return key[:8].ljust(8, b'\0')
        case _:
            print('Fejl: Nøglen er ikke 8 bytes')
            key = get_random_bytes(8)
            print(f'Tilfældig nøgle bruges. Nøgle i hex format: {key.hex()}')
            return key[:8].ljust(8, b'\0')

# Tilføjer padding, så antallet af bytes i pt altid går op i 8
def addPadding(pt):
    paddedPT = pt
    while (len(paddedPT) % 8) != 0:
        paddedPT += b'\0'
    return paddedPT

# XOR operation
def xor_bytes(block1, block2):
    return bytes(b1 ^ b2 for b1, b2 in zip(block1, block2))
    
# Krypter DES med blokmetode CBC
def encryptCBC():
    # .strip() fjerner whitespaces
    # .encode() laver det om fra string til bytes
    pt = addPadding(input('Indtast din besked: ').strip().encode())
    key = getKey()
    iv = get_random_bytes(8)
    previous_block = iv
    cipher = DES.new(key, DES.MODE_ECB)
    ct = b''

    # Krypter pt i blokke af 8 bytes
    for i in range(0, len(pt), 8):
        block = pt[i:i + 8]
        # XOR pt-blokken med den forrige ct-blok (eller IV for første blok)
        xored_block = xor_bytes(block, previous_block)
        # Krypter den XORede blok med DES
        encrypted_block = cipher.encrypt(xored_block)
        # Tilføj til ct, og opdater previous_block
        ct += encrypted_block
        previous_block = encrypted_block
    
    return ct, iv

# Dekrypter DES med blokmetode CBC
def decryptCBC():
    try:
        ct = bytes.fromhex(input('Indtast din krypterede besked i hex format: '))
    except:
        print('Fejl: Ikke hex format')
        exit()
    key = getKey()
    cipher = DES.new(key, DES.MODE_ECB)
    try:
        iv = bytes.fromhex(input('Indtast IV i hex format: '))
        if len(iv) != 8:
            raise ValueError
    except:
        print('Fejl: Forkert længde eller format af IV')
        exit()
    pt = b''
    previous_block = iv

    # Dekrypter pt i blokke af 8 bytes
    for i in range(0, len(ct), 8):
        block = ct[i:i + 8]
        decrypted_block = cipher.decrypt(block)
        # XOR den dekrypterede blok med den forrige ct-blok (eller IV for første blok)
        xored_block = xor_bytes(decrypted_block, previous_block)
        # Tilføj til pt, og opdater previous_block
        pt += xored_block
        previous_block = block
    
    return pt

if __name__ == '__main__':
    while True:
        print('===== DES maskinen =====\n'
          '\n'
          '1: Krypter\n'
          '2: Dekrypter\n'
          '3: Forlad\n'
          )
        match input('> '):
            case '1':
                ct, iv = encryptCBC()
                print('\n'
                    f'Krypteret besked i hex format: {ct.hex()}\n'
                    f'IV i hex format: {iv.hex()}\n'
                    )
            case '2':
                pt = decryptCBC()
                print('\n'
                      f'Dekrypteret besked i hex format: {pt.hex()}\n'
                      f'Dekrypteret besked i ASCII format: {pt.decode()}\n'
                      )
            case '3':
                print('Farvel')
                exit()
            case _:
                print('Ugyldig')
    
    