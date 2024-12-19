from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
import binascii

def decrypt_aes(ciphertext, key, iv):
    # Create a new AES cipher object with the provided key and IV
    cipher = AES.new(key, AES.MODE_CBC, iv)

    # Decrypt the ciphertext
    decrypted_padded_text = cipher.decrypt(ciphertext)

    # Unpad the decrypted text to get the original plaintext
    decrypted_text = unpad(decrypted_padded_text, AES.block_size)

    return decrypted_text.decode()

if __name__ == "__main__":
    key_hex = input("Enter the key (in hexadecimal format): ")
    iv_hex = input("Enter the IV (in hexadecimal format): ")
    encrypted_hex = input("Enter the encrypted text (in hexadecimal format): ")

    key = bytes.fromhex(key_hex)  # Convert key from hex to bytes
    iv = bytes.fromhex(iv_hex)  # Convert IV from hex to bytes
    encrypted_text = bytes.fromhex(encrypted_hex)  # Convert encrypted text from hex to bytes

    # Decrypt the ciphertext
    decrypted_text = decrypt_aes(encrypted_text, key, iv)
    print(f"Decrypted: {decrypted_text}")
