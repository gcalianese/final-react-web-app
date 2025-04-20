import { useSelector } from "react-redux";
import "./homeStyle.css"

export default function Home() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div className="ct-home-page">
            <h1>
                Welcome to Chalk Talk{currentUser ? `, ${currentUser.firstName}` : ""}
            </h1>

            <div className="split-screen">
                <div className="left-panel">
                    <h2>About the Team</h2>
                    <p>
                        Grace and Haig are students in CS4550-02 Web Development who are passoniate
                        about both programming and rock climbing.
                    </p>
                </div>
                <div className="right-panel">
                    <h2>About ChalkTalk</h2>
                    <p>
                        ChalkTalk is a place to share pictures of your latest sends, new gear,
                        and fitness/technique workouts. Engage with the climbing community
                        by posting your own content and liking/commenting on others.

                        <br/><br />

                        Don't climb yet? Use our "Find a Gym" tool to lookup climbing gyms
                        near you to get started!
                    </p>
                </div>
            </div>
        </div>
    );
}
