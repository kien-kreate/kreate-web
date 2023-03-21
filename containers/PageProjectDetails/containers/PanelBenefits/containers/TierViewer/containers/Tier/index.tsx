import cx from "classnames";

import WithAspectRatio from "../../../../../../../../components/WithAspectRatio";

import IconUserGroup from "./icons/IconUserGroup";
import styles from "./index.module.scss";

import {
  formatLovelaceAmount,
  sumLovelaceAmount,
} from "@/modules/bigint-utils";
import { LovelaceAmount, ProjectBenefitsTier } from "@/modules/business-types";
import ImageView from "@/modules/teiki-components/components/ImageView";
import RichTextViewer from "@/modules/teiki-components/components/RichTextViewer";
import Button from "@/modules/teiki-ui/components/Button";
import Flex from "@/modules/teiki-ui/components/Flex";
import Typography from "@/modules/teiki-ui/components/Typography";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  value: ProjectBenefitsTier & { activeMemberCount?: number };
  stakingAmount?: LovelaceAmount;
  onClickBecomeMember?: (initialAmount?: LovelaceAmount) => void;
};

export default function Tier({
  className,
  style,
  value,
  stakingAmount,
  onClickBecomeMember,
}: Props) {
  const actualStakingAmount = stakingAmount ?? 0;

  return (
    <div className={cx(className, styles.container)} style={style}>
      <Flex.Col
        gap="20px"
        padding="32px"
        justifyContent="center"
        alignItems="center"
      >
        <Typography.Div
          content={value.title}
          size="heading4"
          fontWeight="bold"
          className={styles.required}
        />
        {value.banner == null ? null : (
          <div className={styles.bannerContainer}>
            <WithAspectRatio aspectRatio={16 / 9}>
              <ImageView
                className={styles.banner}
                src={value.banner.url}
                crop={{
                  x: value.banner.x,
                  y: value.banner.y,
                  w: value.banner.width,
                  h: value.banner.height,
                }}
              />
            </WithAspectRatio>
          </div>
        )}
        <Flex.Row alignItems="center" gap="8px">
          <Typography.Span content="Staking from" size="bodySmall" />
          <Typography.Span
            content={formatLovelaceAmount(value.requiredStake, {
              compact: true,
              includeCurrencySymbol: true,
            })}
            size="heading4"
            fontWeight="bold"
          />
        </Flex.Row>
        <Flex.Col gap="16px" alignItems="center" style={{ width: "100%" }}>
          <Button.Solid
            content="Become a member"
            size="large"
            color="primary"
            style={{ width: "100%" }}
            onClick={() =>
              onClickBecomeMember &&
              onClickBecomeMember(
                value.requiredStake <= actualStakingAmount
                  ? undefined
                  : sumLovelaceAmount([
                      value.requiredStake,
                      -actualStakingAmount,
                    ])
              )
            }
            disabled={
              value.maximumMembers != null &&
              (value.activeMemberCount || 0) >= value.maximumMembers
            }
          />
          <Flex.Row alignItems="center" gap="12px">
            <IconUserGroup />
            <Typography.Div
              content={
                value.maximumMembers
                  ? `${value.activeMemberCount || 0}/${
                      value.maximumMembers
                    } limited members`
                  : `${value.activeMemberCount || 0} members`
              }
              color={value.maximumMembers ? "red" : undefined}
              size="heading6"
            />
          </Flex.Row>
        </Flex.Col>
        {!value.contents ? null : (
          <RichTextViewer
            value={value.contents.body}
            className={styles.richText}
          />
        )}
      </Flex.Col>
    </div>
  );
}