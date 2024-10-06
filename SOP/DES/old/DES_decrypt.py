# Use same IP, FP, E, S, and P tables as in the encryption script
IP = [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
      62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
      57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
      61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7]

FP = [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31,
      38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29,
      36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
      34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25]

E = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17,
     16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1]

S = [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11]

P = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10,
     2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25]

# Function to perform permutation
def permute(block, table):
    return [block[x - 1] for x in table]

# Function to XOR two blocks
def xor(block1, block2):
    return [b1 ^ b2 for b1, b2 in zip(block1, block2)]

# DES round function (F-function)
def des_round(right, subkey):
    expanded_right = permute(right, E)
    xored = xor(expanded_right, subkey)
    substituted = [S[b] for b in xored]
    return permute(substituted, P)

# DES decryption function (same as encryption but subkey order reversed)
def des_decrypt(ciphertext, key):
    block = permute(ciphertext, IP)
    left, right = block[:32], block[32:]
    
    for i in range(16):
        subkey = key[:48]  # Simplified subkey for demo
        temp_right = des_round(right, subkey)
        new_right = xor(left, temp_right)
        left = right
        right = new_right
    
    preoutput = right + left
    plaintext = permute(preoutput, FP)
    
    return plaintext

# Helper function to convert bit list to string
def bits_to_str(b):
    chars = [chr(int(''.join(map(str, b[i:i + 8])), 2)) for i in range(0, len(b), 8)]
    return ''.join(chars)

# Decryption process
def decrypt(ciphertext, key):
    decrypted_bits = des_decrypt(ciphertext, key)
    return bits_to_str(decrypted_bits)

if __name__ == "__main__":
    # Example usage
    ciphertext = [4, 0, 15, 12, 3, 1, 3, 0, 8, 13, 1, 12, 0, 1, 2, 13, 6, 10, 12, 8, 9, 0, 13, 15, 0, 13, 4, 7, 5, 7, 4, 8, 2, 13, 9, 12, 14, 6, 3, 15, 12, 9, 3, 1, 2, 0, 4, 7, 4, 7, 6, 12, 3, 15, 10, 5, 8, 13, 2, 13, 15, 12, 3, 15]  # Replace with actual ciphertext
    key = [1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]  # Replace with the key from encryption
    decrypted_text = decrypt(ciphertext, key)
    print(f"Decrypted text: {decrypted_text}")
