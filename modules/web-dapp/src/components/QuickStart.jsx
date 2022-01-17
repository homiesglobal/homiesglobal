import { Card, Input, Button, Typography, Row, Col, Form } from "antd";
import React, {useCallback, useMemo} from "react";
import {Greeter__factory} from "@homiesglobal/contracts/typechain";
import {ethers} from "ethers";

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
  }
};

export const QuickStart = ({ isServerInfo }) => {
  const greeterContract = useMemo(() => {
    const provider = new ethers.providers.JsonRpcProvider();
    return Greeter__factory.connect('', provider);
  }, []);

  const onSubmitHandler = useCallback((values) => {
    console.log(values);
  }, []);


  return (<>
    <Row>
      <Col md={{ span: 12, offset: 6 }} span={24} offset={0}>
        <div>
      <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>Interact with Greeter Contract</Text>
          </>
        }>
        <Paragraph>
          This is a demo setup that interacts with the Greeter.sol contract in the
          contracts module.
          <br/>
          Update the greeting value by submitting a new value in the input text below:
        </Paragraph>
        <Paragraph style={{ fontSize: "20px" }}>
          Current greetings: <b>Hello</b>
        </Paragraph>
        <Form onFinish={onSubmitHandler}>
          <Input.Group>
            <Form.Item
                name="greeting"
                rules={[
                  {
                    required: true,
                    message: 'Please input a new greeting!',
                  },
                ]}
            >
              <Input size="large" placeholder="Enter new Greeting" />
            </Form.Item>
            <Button size="large" type="primary" htmlType="submit">Update Greeting</Button>
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
          }>
        </Card>
      </Col>
    </Row>
  </>
  );
}
