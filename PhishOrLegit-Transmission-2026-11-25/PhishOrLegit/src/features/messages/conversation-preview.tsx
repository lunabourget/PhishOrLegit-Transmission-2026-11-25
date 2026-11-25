import { SystemIcon } from "@/components/ios/system-icon";

import styles from "./messages.module.css";

type ConversationPreviewProps = {
  body: string;
  sender: string;
  time: string;
  unread?: boolean;
};

export function ConversationPreview({
  body,
  sender,
  time,
  unread = false,
}: ConversationPreviewProps) {
  return (
    <article className={styles.conversation}>
      <span
        aria-label={unread ? "Unread" : undefined}
        className={styles.unreadDot}
        data-visible={unread ? "true" : "false"}
      />
      <div aria-hidden="true" className={styles.avatar}>
        {sender.slice(0, 1).toUpperCase()}
      </div>
      <div className={styles.conversationBody}>
        <div className={styles.conversationHeader}>
          <strong>{sender}</strong>
          <span>{time}</span>
        </div>
        <p>{body}</p>
      </div>
      <SystemIcon className={styles.chevron} name="back" size={15} />
    </article>
  );
}
