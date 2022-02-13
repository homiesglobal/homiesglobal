import React from "react";
import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { Logo } from "../components/Icons/Logo";
import { AppRoute } from "../config/routes";
import { Button } from "../components/Button/Button";
import { VerticallyCenter } from "../components/Layout/VerticallyCenter";

export const Home: React.FC = () => {
  return (
    <Row justify="center">
      <Col sm={{ span: 24 }} md={{ span: 12 }} className={styles.content}>
        <VerticallyCenter>
          <Logo />
          <h1 className={styles.title}>
            Introduction to HOMIE <ArrowRightOutlined />
          </h1>
          <p className={styles.subtitle}>
            With the launch of HOMIE and the DAO, the community will be
            empowered to govern the Homie Token
          </p>
          <Link to={AppRoute.ConnectWallet}>
            <Button className={styles.connectButton} type="primary">
              Connect Wallet
            </Button>
          </Link>
        </VerticallyCenter>
      </Col>
    </Row>
  );
};
