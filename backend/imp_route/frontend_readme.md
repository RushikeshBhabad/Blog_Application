# Deploy Frontend on Amazon EC2 WITHOUT NGINX

---

# STEP 1 — Launch Frontend EC2

Create Ubuntu EC2 instance:

| Setting | Value           |
| ------- | --------------- |
| Name    | `blog-frontend` |
| OS      | Ubuntu 22.04    |
| Type    | t2.micro        |

Use same `.pem` key.

---

# STEP 2 — Configure Security Group

Add inbound rules:

| Type       | Port | Source   |
| ---------- | ---- | -------- |
| SSH        | 22   | Anywhere |
| Custom TCP | 5173 | Anywhere |

Port 5173 is used by Vite frontend.

---

# STEP 3 — Get Public IP

Copy frontend public IP.

Example:

```
13.233.xx.xx
```

---

# STEP 4 — Connect from Fedora

```
cd ~/Downloads
chmod 400 mykey.pem
```

Connect:

```
ssh -i mykey.pem ubuntu@FRONTEND_PUBLIC_IP
```

Example:

```
ssh -i mykey.pem ubuntu@13.233.xx.xx
```

---

# STEP 5 — Install Node.js + Git

```
sudo apt update && sudo apt upgrade -y
```

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

```
sudo apt install -y nodejs git
```

sudo apt install git -y

Check:

```
node -v
npm -v
```

---

# STEP 6 — Clone Repo

```
git clone https://github.com/RushikeshBhabad/Blog_Application.git
```

Go frontend folder:

```
cd Blog_Application/client
```

---

# STEP 7 — Install Dependencies

```
npm install
```

---

# STEP 8 — Create .env

```
nano .env
```

Add backend URL:

```
VITE_API_URL= http://BACKEND_PUBLIC_IP:5000

VITE_API_URL=http://16.171.162.105:5000
```

Example:

```
VITE_API_URL=http://65.1.23.45:5000
```

Save:

```
CTRL + O
ENTER
CTRL + X
```

---

# STEP 9 — Start Frontend

```

npm run dev -- --host
npm run dev -- --host 0.0.0.0


```

You should see:

```
Local:   http://localhost:5173
Network: http://51.20.1.242:5173
51.20.1.242
```

---

# STEP 10 — Open Frontend in Browser

```t
http://FRONTEND_PUBLIC_IP:5173
```

Example:

```
http://13.233.xx.xx:5173
```

Frontend should open.

---


# STEP 11 — Run Frontend Permanently (Optional but Recommended)

Install PM2:

```
sudo npm install -g pm2
```

Run frontend:

```bash id="jlwma9"
pm2 start npm --name frontend -- run dev -- --host
```

Save:

```bash id="jlwmr2"
pm2 save
```

Enable auto-start:

```bash id="jlwmx6"
pm2 startup
```

Run command PM2 gives.
