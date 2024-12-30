import React from "react";
import NavigationBar from "./NavigationBar";
import Header from './Header';

const Activity = () => {
  return (
    <div>
      <NavigationBar />
      <Header backButton={true} title="Activity"/>
      <div style={styles.container}>
        <h1>Activity Page</h1>
        <p>Track your activities and progress here.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "80px", // Navbar'ın üst kısmına boşluk eklemek için
    padding: "20px",
    textAlign: "center"
  }
};

export default Activity;
