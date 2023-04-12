// Team page
const Team = () => {
  return (
    <main className="team-page">
      {/* Team section */}
      <section className="team-section">
        <div className="container">
          <div className="team-member">
            <div className="member">
              <div className="member-info">
                <h2>C COLMAN</h2>
                <p>An early adopter and pioneer in blockchain saucery</p>
              </div>

              <div className="bottol">
                <img src="/image/Saucebottle-mustard.gif" alt="" />
              </div>
            </div>

            <div className="member">
              <div className="member-info">
                <h2>J Hellmann</h2>
                <p>
                  Western Cowboy with a passion for web3 and my annoying horse
                  Mayo, he always neighs
                </p>
              </div>

              <div className="bottol">
                <img src="/image/Saucebottle-mayo.gif" alt="" />
              </div>
            </div>

            <div className="member">
              <div className="member-info">
                <h2>H Heinz</h2>
                <p>Sauce lover, Web3 mastermind, Artist, Great a roma</p>
              </div>

              <div className="bottol">
                <img src="/image/Saucebottle-ketchup.gif" alt="" />
              </div>
            </div>
          </div>

          <div className="socials">
            <a href="https://twitter.com/GetTheDip" target="_blank">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9442 3.98747C17.9569 4.16243 17.9569 4.33751 17.9569 4.51247C17.9569 9.84997 13.8325 16 6.29447 16C3.97205 16 1.81468 15.3374 0 14.1875C0.329962 14.225 0.647189 14.2375 0.989852 14.2375C2.90608 14.2375 4.67003 13.6 6.07868 12.5125C4.27671 12.475 2.76647 11.3125 2.24614 9.71249C2.50005 9.74999 2.75375 9.77498 3.02027 9.77498C3.38838 9.77498 3.75638 9.72499 4.09896 9.63751C2.22082 9.26249 0.812153 7.63753 0.812153 5.67503V5.62505C1.35781 5.92498 1.99244 6.11254 2.66499 6.13743C1.56088 5.41248 0.837546 4.17493 0.837546 2.77492C0.837546 2.02498 1.04055 1.33753 1.39595 0.737442C3.4137 3.18744 6.44668 4.7874 9.84767 4.96247C9.78422 4.66243 9.74619 4.35 9.74619 4.03746C9.74619 1.81253 11.5736 0 13.8451 0C15.0254 0 16.0914 0.4875 16.8401 1.27504C17.7665 1.09997 18.6548 0.762436 19.4416 0.300042C19.137 1.23755 18.4899 2.02498 17.6396 2.52498C18.4644 2.4375 19.264 2.21244 20 1.90001C19.4418 2.69994 18.7437 3.4125 17.9442 3.98747Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

// Export
export default Team;
