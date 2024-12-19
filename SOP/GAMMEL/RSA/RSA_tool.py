from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64
import os

def generate_keys():
    # Generate RSA keys
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

def encrypt_rsa(plaintext, public_key):
    # Create a new RSA cipher object
    cipher = PKCS1_OAEP.new(RSA.import_key(public_key))
    
    # Encrypt the plaintext
    encrypted_text = cipher.encrypt(plaintext.encode())
    return encrypted_text

def decrypt_rsa(encrypted_text, private_key):
    # Create a new RSA cipher object
    cipher = PKCS1_OAEP.new(RSA.import_key(private_key))

    # Decrypt the ciphertext
    decrypted_text = cipher.decrypt(encrypted_text)
    return decrypted_text.decode()

def main():
    private_key, public_key = generate_keys()  # Generate RSA keys

    while True:
        print("\nChoose an option:")
        print("1. View Public Key")
        print("2. Encrypt a message using the Public Key")
        print("3. Decrypt a message using the Private Key")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            print(f"\nPublic Key (Base64): {base64.b64encode(public_key).decode()}")
        
        elif choice == '2':
            plaintext = input("Enter the plaintext to encrypt: ")
            encrypted_text = encrypt_rsa(plaintext, public_key)
            print(f"Encrypted (Base64): {base64.b64encode(encrypted_text).decode()}")

        elif choice == '3':
            encrypted_b64 = input("Enter the encrypted text (in Base64 format): ")
            encrypted_text = base64.b64decode(encrypted_b64)  # Convert from Base64 to bytes
            decrypted_text = decrypt_rsa(encrypted_text, private_key)
            print(f"Decrypted: {decrypted_text}")

        elif choice == '4':
            print("Exiting the program.")
            break
        
        else:
            print("Invalid choice. Please select a valid option.")

if __name__ == "__main__":
    main()
