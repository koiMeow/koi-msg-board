import { format, isToday } from 'date-fns'

const Post = ({ message }) => {
    const date = message.time.toDate()

    return <div className="postitem">
        <div>{message.message}</div>
        <div>{isToday(date) ? format(date, 'HH:mm') : format(date, 'MM/dd')}</div>
    </div>
}

export default Post