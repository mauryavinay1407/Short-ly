# Short-ly

**Short-ly** is a cutting-edge URL shortener web application designed to simplify and enhance your URL management experience. Built with Next.js, Tailwind CSS, and a host of modern libraries, Short-ly offers a sleek and responsive user interface for shortening and managing your URLs efficiently.

#### Key Features:

-   **Intuitive Interface:** Leveraging the power of [Tailwind CSS](https://tailwindcss.com/) and Framer Motion for smooth animations, Short-ly provides a clean and engaging user experience.
-   **Seamless Authentication:** Integrated with [Clerk](https://clerk.dev/), Short-ly ensures secure user authentication and personalized access.
-   **User Dashboard:** Manage all your shortened URLs in a personal dashboard. Edit, delete, and monitor your links with ease.
-   **Click Analytics:** Track clicks and visits for each short link. View real-time analytics and visit history, including a visual chart of link activity over time.
-   **Modern UI Components:** Utilizes [Radix UI](https://www.radix-ui.com/) components for a robust and accessible user interface, combined with [Tabler Icons](https://tablericons.com/) for a visually appealing design.
-   **Real-time Feedback:** Features real-time notifications using [React Hot Toast](https://react-hot-toast.com/) to keep users informed of their actions.
-   **Efficient Backend:** Powered by [Mongoose](https://mongoosejs.com/) for seamless interaction with MongoDB, ensuring efficient data management and URL storage.
-   **Optimized Performance:** Built with [Next.js](https://nextjs.org/) for server-side rendering and optimized performance, ensuring fast load times and a smooth user experience.
-   **TypeScript Support:** Developed with TypeScript for type safety and enhanced developer experience.
-   **Modern Build Tools:** Uses [ESLint](https://eslint.org/) and [PostCSS](https://postcss.org/) for maintaining code quality and efficient styling.

Installation
------------

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18 or higher)
-   [MongoDB](https://www.mongodb.com/) (for local development or use a cloud provider)

### Clone the Repository

```sh
git clone https://github.com/your-username/short-ly.git
cd short-ly
```
### Install Dependencies

```sh
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory of the project and add the following environment variables:

```sh
NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
CLERK_API_KEY=<your-clerk-api-key>
MONGODB_URI=<your-mongodb-uri>
```

Replace `<your-clerk-frontend-api>`, `<your-clerk-api-key>`, and `<your-mongodb-uri>` with your actual Clerk and MongoDB credentials.

Usage
-----

### Development

To start the development server, run:

```sh
npm run dev
```
Visit `http://localhost:3000` in your browser to view the application.

### Build

To create an optimized production build, run:

```sh
npm run build`
```

### Start

To start the production server, run:

```sh
npm run start
```