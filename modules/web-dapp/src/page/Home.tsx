import React from "react";
import { Typography, Row, Col } from "antd";
import { Logo } from "../components/Logo";
import { WalletLoginButton } from "../components/WalletLoginButton";

const { Title, Text } = Typography;

const styles = {
  content: {
    textAlign: "center",
  },
  title: {},
};

export const Home: React.FC = () => {
  return (
    <div>
      <Row justify="center">
        <Col style={{ textAlign: "center" }}>
          <Logo />
          <Title style={styles.title} level={2}>
            Introduction to HOMIE
          </Title>
          <div>
            <Text>
              With the launch of HOMIE and the DAO, the community will be
              empowered to govern the Homie Token
            </Text>
          </div>
          <WalletLoginButton />
        </Col>
      </Row>
    </div>
  );
};
