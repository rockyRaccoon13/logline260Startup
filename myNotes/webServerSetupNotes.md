# Reading Notes

## Technology Stack - Tech Stack

front end is user browser... back end is computer server servicing web app to browser over internet

Here is what our stack looks like: React for the web framework, talking to Caddy as the web server hosted on AWS, running web services with Node.js, and MongoDB as the database hosted on MongoDB Atlas.

![techstack ](https://github.com/user-attachments/assets/a6ee54c8-e955-405c-ad10-ef04bc03bb18)

## The internet
connects networks and subnetworks .... and computers through physical and wireless links


### Making connections
IP address is a numeric address of a computer. Look up IP address from human readable domain name through Domain Name sSystem (DNS)

look up IP address for domain name using console `dig` command
```sh
  dig byu.edu
```

Creating connection
After IP address is known, internet dynamically discovers route to device to establish connection.
Then Transport and application layers start transfering data

### traceroute
`traceroute byu.edu`
console utility that shows route between home computer and IP/domain name
usually home network >... couple hops > ISP >... more devices > dest device

`traceroute byu.edu`



# Class notes 

| Layer | Example | Purpose |
| ----- | ------- | ------- |
| Application | HTTPS | Functionality like web browsing |
| Transport | TCP/UDP | Packet Delivery (Transmission Control Protocol, User Datagram Protocol - - good for video games, video playback) |
| Internet | IP | Establishing connections, routing |
| Link | Fiber, hardware | physical connections |

## DNS domain name system
browser through internet talk to DNS to get IP address for domain name (table of human readable names to IP address).
Then browser takes IP address to talk to server at IP address

**Domain names**

[subdomain.]*secondary.topLevel

you buy root (choose secondary name. top is from list of tlds)

**local host**
local host (127.0.0.1) - computer network card codes its own domain name to this IP. on all computers

### Record types
A/ AAAA
- Address. specific address ipv4/ipv6. (root and subdomains *.root for redirect all)
CNAME
- Canonical Name. Alias
NS
- Name server. Authority for queries and proof of ownership
Text
- metadata. used for policies and verification
SOA
Start of Authority. Propagation information

### Leasing domain name
ICANN leases rates around hundreds usd range
Commercial sales of leases can be 100,000s upward


  





