import {Group, Headline, Title} from "@vkontakte/vkui";
import React from "react";

type InfoBlockProps = {
    titleText: string;
    valueText: string;
};

export const InfoBlock: React.FC<InfoBlockProps> = ({titleText, valueText}) => {
  return (
    <Group
    header={
      <Title level="2" weight="bold">
        {titleText}
      </Title>
    }
    style={{ padding: '0.3rem' }}
    >
    <Headline weight="regular">
      {valueText}
    </Headline>
  </Group>
  );
}


