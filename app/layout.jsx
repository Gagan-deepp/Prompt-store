import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import '@/styles/global.css';

export const metadata = {
    title: "Next Project",
    description: "A new next project as a beginner"
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en' >
            <body>
                <Provider>
                    <Nav />
                    <main className='app' >
                        {children}
                    </main>
                </Provider>
            </body>
        </html>

    )
}

export default RootLayout