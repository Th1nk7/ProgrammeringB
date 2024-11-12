import ntptime
ntp = ntptime.client(host='dk.pool.ntp.org', timezone=8)

print(str(ntp.getTimestamp()))