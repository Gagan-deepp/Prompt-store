import Feed from "@/components/Feed"

const Home = () => {
    return (
        <section className="homeSection container" >
            <h1 className="heading">
                Discover and Share

                <br />

                <span className="heading"> AI Powered Prompts </span>
            </h1>
            <Feed />
        </section>

    )
}

export default Home