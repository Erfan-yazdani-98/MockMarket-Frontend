# Step 1: Use Nginx to serve the prebuilt Angular app
FROM nginx:alpine

# Copy built files from the host into the Nginx html directory
COPY ./mock-market/browser /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
