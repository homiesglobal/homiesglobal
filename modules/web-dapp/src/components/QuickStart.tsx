import { Card, Input, Button, Typography, Row, Col, Form, Spin } from "antd";
import React, { useCallback } from "react";
import { useGreeterContract } from "../hooks/useGreeterContract";

const { Text, Paragraph } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  otherInfo: {
    marginTop: "10px",
  },
  error: {
    margin: "1rem 0",
    padding: "0.5rem",
    color: "#ffffff",
    fontWeight: "bold",
    background: "#bb8b8b",
  },
};

export const QuickStart: React.FC = () => {
  const {
    greeting,
    setNewGreeting,
    error: greetingError,
    inProgress,
  } = useGreeterContract();

  const onSubmitHandler = useCallback(
    (values) => {
      setNewGreeting(values.greeting);
    },
    [setNewGreeting]
  );

  return (
    <>
      <Row>
        <Col md={{ span: 12, offset: 6 }} span={24} offset={0}>
          <div>
            <Card
              style={styles.card}
              title={
                <>
                  📝 <Text strong>Interact with Greeter Contract</Text>
                </>
              }
            >
              <Paragraph>
                This is a demo setup that interacts with the Greeter.sol
                contract in the contracts module.
                <br />
                Update the greeting value by submitting a new value in the input
                text below:
              </Paragraph>
              <Paragraph style={{ fontSize: "20px" }}>
                Current greetings: <b>{greeting}</b>
              </Paragraph>
              <Form onFinish={onSubmitHandler}>
                {greetingError && (
                  <div style={styles.error}>{greetingError}</div>
                )}
                <Input.Group>
                  <Form.Item
                    name="greeting"
                    rules={[
                      {
                        required: true,
                        message: "Please input a new greeting!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Enter new Greeting" />
                  </Form.Item>
                  {!inProgress && (
                    <Button size="large" type="primary" htmlType="submit">
                      Update Greeting
                    </Button>
                  )}
                  {inProgress && <Spin />}
                </Input.Group>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
      <Row style={styles.otherInfo}>
        <Col md={{ span: 12, offset: 6 }} span={24} offset={0}>
          <Card
            style={styles.card}
            title={
              <>
                ℹ️ <Text strong>Other Information</Text>
              </>
            }
          ></Card>
        </Col>
      </Row>
    </>
  );
};
