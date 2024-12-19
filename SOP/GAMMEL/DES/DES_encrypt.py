from Crypto.Cipher import DES
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes

def encrypt_des(plaintext, key):
    # Create a new DES cipher object with the provided key
    cipher = DES.new(key, DES.MODE_ECB)

    # Pad the plaintext to make its length a multiple of DES block size (8 bytes)
    padded_plaintext = pad(plaintext.encode(), DES.block_size)

    # Encrypt the padded plaintext
    encrypted_text = cipher.encrypt(padded_plaintext)

    return encrypted_text

if __name__ == "__main__":
    key = get_random_bytes(8)  # Generate a random 8-byte (64-bit) key
    plaintext = input("Enter the plaintext to encrypt: ")

    # Encrypt the plaintext
    encrypted_text = encrypt_des(plaintext, key)
    print(f"Key (hex): {key.hex()}")  # Display the key in hexadecimal format
    print(f"Encrypted (hex): {encrypted_text.hex()}")  # Display the encrypted text in hexadecimal format
