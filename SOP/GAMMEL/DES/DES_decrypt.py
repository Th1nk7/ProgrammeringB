from Crypto.Cipher import DES
from Crypto.Util.Padding import unpad
import binascii

def decrypt_des(ciphertext, key):
    # Create a new DES cipher object with the provided key
    cipher = DES.new(key, DES.MODE_ECB)

    # Decrypt the ciphertext
    decrypted_padded_text = cipher.decrypt(ciphertext)

    # Unpad the decrypted text to get the original plaintext
    decrypted_text = unpad(decrypted_padded_text, DES.block_size)

    return decrypted_text.decode()

if __name__ == "__main__":
    key_hex = input("Enter the key (in hexadecimal format): ")
    encrypted_hex = input("Enter the encrypted text (in hexadecimal format): ")

    key = bytes.fromhex(key_hex)  # Convert key from hex to bytes
    encrypted_text = bytes.fromhex(encrypted_hex)  # Convert encrypted text from hex to bytes

    # Decrypt the ciphertext
    decrypted_text = decrypt_des(encrypted_text, key)
    print(f"Decrypted: {decrypted_text}")
