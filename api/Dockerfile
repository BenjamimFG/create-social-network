FROM node:16-alpine3.14

ENV NODE_ENV=production

# Required Env Variables:
# 
# FRONTEND_URL
# MONGO_URL
# SECRET
# CLOUDINARY_CLOUD_NAME
# CLOUDINARY_API_KEY
# CLOUDINARY_SECRET

# Optional Env Variables:
#
# PORT (default: 4000)
# MAIL_SERVICE
# MAIL_USER
# MAIL_PASS

WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY . .

CMD ["pm2", "start", "index.js", "--attach"]
