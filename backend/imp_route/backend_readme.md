# Deploy Backend on Amazon EC2 (WITHOUT NGINX)

We’ll only deploy backend properly using:

* EC2
* Node.js
* PM2
* MongoDB Atlas

Your backend will work like:

```text id="wqj2m6"
http://BACKEND_PUBLIC_IP:5000
```

---

# STEP 1 — Launch Backend EC2 Instance

Go to AWS Console → EC2 → Launch Instance.

## Configure

| Setting  | Value                  |
| -------- | ---------------------- |
| Name     | `blog-backend`         |
| OS       | Ubuntu 22.04           |
| Type     | t2.micro               |
| Key Pair | Create/download `.pem` |

---

# STEP 2 — Configure Security Group

IMPORTANT.

Add inbound rules:

| Type       | Port | Source   |
| ---------- | ---- | -------- |
| SSH        | 22   | Anywhere |
| HTTP        | 80   | Anywhere |
| Custom TCP | 5000 | Anywhere |

This allows browser access to backend.

---

# STEP 3 — Launch Instance

Click:

```text id="5c7l2h"
Launch Instance
```

Wait 1–2 minutes.

---

# STEP 4 — Get Public IP

Go:

```text id="s6gdb5"
EC2 → Instances
```

Click your instance.

Find:

```text id="jyl6h4"
Public IPv4 address
```

Example:

```text id="lf5blg"
65.1.23.45
```

Save this.

This is your backend URL IP.

---

# STEP 5 — Open Fedora Terminal

Go where `.pem` exists.

Usually:

```
cd ~/Downloads
```

Check:

``
ls
```

You should see:

```
mykey.pem
```

---

# STEP 6 — Give PEM Permission

```
chmod 400 mykey.pem
```

---

# STEP 7 — Connect to EC2

Replace IP:

```
ssh -i mykey.pem ubuntu@YOUR_PUBLIC_IP
```

Example:

``
ssh -i mykey.pem ubuntu@65.1.23.45
```

First time type:

```
yes
```

Now you are INSIDE EC2 server.

You’ll see something like:

```
ubuntu@ip-172-31-xx-xx:~$
```

---

# STEP 8 — Update Ubuntu

Run:

```
sudo apt update && sudo apt upgrade -y
```

---

# STEP 9 — Install Node.js

Run:

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

Then:

```
sudo apt install -y nodejs
```

Check:

```
node -v
npm -v
```

You should see versions.

---

# STEP 10 — Install Git

```
sudo apt install git -y
```

---

# STEP 11 — Clone Your GitHub Repo

```
git clone https://github.com/RushikeshBhabad/Blog_Application.git
```

Go inside:

```
cd Blog_Application
```

---

# STEP 12 — Go to Backend Folder

Your project probably has:

```
client/
server/
```

Go backend:

```
cd server
```

Check files:

```
ls
```

You should see:

```
package.json
index.js
```

or server.js.

---

# STEP 13 — Install Dependencies

```
npm install
```

Wait until installation completes.

---

# STEP 14 — Create Environment Variables

Create `.env`

```
nano .env
```

Add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=mysecretkey
```

Example MongoDB Atlas URI:

```
mongodb+srv://username:password@cluster.mongodb.net/blog
```

---

# STEP 15 — Save Nano File

Press:

```
CTRL + O
```

Press ENTER.

Then:

```
CTRL + X
```

---

# STEP 16 — Start Backend Normally First

Run:

```
npm start
```

OR:

```
node index.js
```

Depends on your project.

---

# STEP 17 — Check If Backend Running

You should see:

```
Server running on port 5000
```

OR MongoDB connected message.

---

# STEP 18 — Test Backend in Browser

Open browser on your laptop:

```
http://YOUR_PUBLIC_IP:5000
```

Example:

```text id="u2b7xb"
http://65.1.23.45:5000
```
http://16.171.162.105:5000

If backend works → deployment successful.

---

# STEP 19 — Stop Temporary Server

Inside terminal:

Press:

```
CTRL + C
```

---

# STEP 20 — Install PM2

Install globally:

```bash id="3n5izw"
sudo npm install -g pm2
```

---

# STEP 21 — Run Backend Permanently

If main file is index.js:

```bash id="e2ww2x"
pm2 start index.js --name blog-backend
```

If server.js:

```bash id="uh99w1"
pm2 start server.js --name blog-backend
```

---

# STEP 22 — Check PM2 Status

```bash id="xum37y"
pm2 status
```

You should see:

```text id="rjlwmv"
online
```

---

# STEP 23 — Save PM2 Process

```bash id="k2fqq5"
pm2 save
```

---

# STEP 24 — Enable Auto Restart After Reboot

Run:

```bash id="2xk3d5"
pm2 startup
```

It gives another command.

Example:

```bash id="sbgz3g"
sudo env PATH=$PATH:/usr/bin ...
```

COPY and run that command.

Now backend auto-starts even after EC2 reboot.

---

# DONE

Your backend is now live at:

```text id="v8e49p"
http://YOUR_PUBLIC_IP:5000
```

---

# Useful Commands

## View Logs

```bash id="jlwmqb"
pm2 logs
```

---

## Restart Backend

```bash id="n5svot"
pm2 restart blog-backend
```

---

## Stop Backend

```bash id="dykt5r"
pm2 stop blog-backend
```

---

## Delete Backend Process

```bash id="e4l4go"
pm2 delete blog-backend
```

---

## Check Running Ports

```bash id="j2h5r2"
sudo lsof -i :5000
```
