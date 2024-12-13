# Image Masker

A web application to edit images by drawing masks. Users can scale the image, adjust brush size, and export both the original image and the mask image.

## Features
- Upload and display an image.
- Draw masks on the image using an adjustable brush.
- Scale the image dynamically.
- Export the original image and the mask image as separate files.

##Live Preview Link
- <a href="https://image-masker.onrender.com">Live preview </a

## Libraries Used
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **Vite**: For a fast development server and build process.

## How to Run the Project Locally

### Prerequisites
- Node.js (v14 or above)
- npm or yarn package manager

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   or, if you use Yarn:
   ```bash
   yarn install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   or, if you use Yarn:
   ```bash
   yarn dev
   ```

4. **Open the Application**:
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Project Specifications
### Technologies
- **React**: Component-based architecture for building UI.
- **Vite**: Ultra-fast development and build tool.
- **Tailwind CSS**: Utility-first CSS framework for rapid design.

### Functionalities
- **Canvas Drawing**:
  - Uses `<canvas>` for rendering and masking the image.
  - Brush size and mask are configurable.
- **Image Scaling**:
  - Dynamically scales the image based on user input (10% to 100%).
- **Export Functionality**:
  - Exports the original image and mask image as separate `.png` files.
- **Responsive Design**:
  - The application layout is optimized for various screen sizes.

  
Feel free to suggest improvements or raise issues if you encounter any problems!
