# Todo Application Frontend

A modern, responsive React frontend for the AWS Serverless Todo application.

## 🚀 Features

- **Create Todos**: Add new todos with title, description, and user ID
- **View Todos**: Display all todos with beautiful UI
- **Edit Todos**: Inline editing of todo title and description
- **Complete Todos**: Mark todos as completed
- **Delete Todos**: Remove todos with confirmation
- **Real-time Updates**: Immediate UI updates after API calls
- **Email Notifications**: Get email alerts when todos are created
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with animations

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Axios** for API communication
- **CSS3** with modern styling and animations
- **Responsive Design** for all devices

## 📦 Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TodoList.tsx      # Main todo list component
│   │   └── TodoItem.tsx      # Individual todo item component
│   ├── services/
│   │   └── todoApi.ts        # API service for backend communication
│   ├── App.tsx               # Main app component
│   ├── App.css               # Main styles
│   └── main.tsx              # App entry point
├── public/                   # Static assets
└── package.json              # Dependencies and scripts
```

## 🔧 Configuration

### API Endpoint

The frontend is configured to connect to your AWS API Gateway. The API URL is set in `src/services/todoApi.ts`:

```typescript
const API_BASE_URL = 'https://g02flqc27a.execute-api.us-east-1.amazonaws.com/prod';
```

If your API URL changes, update this constant.

## 🎯 Usage

### Creating a Todo

1. Click the **"Add New Todo"** button
2. Fill in the form:
   - **Title** (required): The todo title
   - **Description** (optional): Additional details
   - **User ID** (optional): User identifier
3. Click **"Create Todo"**
4. You'll receive an email notification!

### Managing Todos

- **View**: All todos are displayed in a clean list
- **Edit**: Click the **"Edit"** button to modify title/description
- **Complete**: Click **"Mark Complete"** to toggle completion status
- **Delete**: Click **"Delete"** to remove a todo (with confirmation)

### Todo Statistics

The app shows:
- Total number of todos
- Number of completed todos
- Number of pending todos

## 🎨 Design Features

- **Gradient Background**: Beautiful purple gradient
- **Card-based Layout**: Clean, modern card design
- **Hover Effects**: Smooth animations on interaction
- **Responsive**: Adapts to different screen sizes
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## 🔄 API Integration

The frontend integrates with your AWS backend:

- **GET /todos**: Fetch all todos
- **POST /todos**: Create new todo
- **PUT /todos/{id}**: Update existing todo
- **DELETE /todos/{id}**: Delete todo

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Full layout with side-by-side elements
- **Tablet**: Adjusted spacing and layout
- **Mobile**: Stacked layout with full-width buttons

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files.

### Deploy Options

1. **Netlify**: Drag and drop the `dist` folder
2. **Vercel**: Connect your GitHub repository
3. **AWS S3**: Upload to S3 bucket with CloudFront
4. **GitHub Pages**: Deploy from GitHub Actions

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**:
   - Check if your backend is deployed
   - Verify the API URL in `todoApi.ts`
   - Ensure CORS is configured on your API Gateway

2. **Email Notifications Not Working**:
   - Verify your email in AWS SES
   - Check SES sandbox mode settings
   - Review Lambda function logs

3. **Styling Issues**:
   - Clear browser cache
   - Check for CSS conflicts
   - Verify all CSS files are loaded

### Development Tips

- Use browser developer tools to debug API calls
- Check the Network tab for request/response details
- Review console logs for error messages
- Test on different devices for responsive design

## 📄 License

This project is part of the AWS Serverless Todo Application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review AWS CloudWatch logs
3. Test API endpoints directly
4. Check browser console for errors
