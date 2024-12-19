from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes

def encrypt_aes(plaintext, key):
    # Create a new AES cipher object with the provided key
    cipher = AES.new(key, AES.MODE_CBC)

    # Pad the plaintext to make its length a multiple of AES block size (16 bytes)
    padded_plaintext = pad(plaintext.encode(), AES.block_size)

    # Encrypt the padded plaintext
    iv = cipher.iv  # Get the initialization vector
    encrypted_text = cipher.encrypt(padded_plaintext)

    return iv, encrypted_text

if __name__ == "__main__":
    key = get_random_bytes(32)  # Generate a random 32-byte (256-bit) key
    plaintext = input("Enter the plaintext to encrypt: ")

    # Encrypt the plaintext
    iv, encrypted_text = encrypt_aes(plaintext, key)
    print(f"Key (hex): {key.hex()}")  # Display the key in hexadecimal format
    print(f"IV (hex): {iv.hex()}")  # Display the IV in hexadecimal format
    print(f"Encrypted (hex): {encrypted_text.hex()}")  # Display the encrypted text in hexadecimal format
