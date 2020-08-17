import React, {FunctionComponent} from "react"
import styles from "./Comment.scss?module"
import User from "../../user/user.interface"
import {Dropdown} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons"
import CustomToggle from "../../dropdown/custom-toggle/CustomToggle"
import Avatar from "../../user/avatar/Avatar"
import Vote, {VoteType} from "../vote/vote.interface";

interface Props {
  author: User
  timestamp: string
  text: string
  user?: User
  votes: Vote[]
  onDelete: () => void
}

const Comment: FunctionComponent<Props> = ({author, timestamp, text, user, votes, onDelete}) => {
  return (
    <div className={styles.comment}>
      <div style={{ marginRight: "0.7rem" }}>
        <Avatar src={author.avatar.url} countryCode={author.country} size="sm" />
      </div>
      <div className={styles.content}>
        <div className="d-flex">
          <div className={styles.authorTextTimestamp}>
            <span className={styles.author}>@{author.username}</span>
            <span className={styles.text}>{text}</span>
            <div className={styles.timestamp}>{timestamp}</div>
            {votes && votes.length > 0 && (
              <div>
                <span>
                  Upvotes: {votes.filter((v: Vote) => v.type == VoteType.UP).length}
                </span>
                <span>
                  Downvotes: {votes.filter((v: Vote) => v.type == VoteType.DOWN).length}
                </span>
              </div>
            )}
          </div>
          {user && user.id == author.id && (
            <div className={styles.threeDotsMenu}>
              <Dropdown alignRight={true}>
                <Dropdown.Toggle as={CustomToggle} id="something">
                  <span className={styles.iconWrapper}>
                    <FontAwesomeIcon className={styles.icon} icon={faEllipsisV} />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
