import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ListBoxWrapper } from '@/components/ui/list-box-wrapper';
import selectTopicList from '../prisma/queries/selectTopicList';

export default async function TopicList() {
  const topics = await selectTopicList();

  if (topics.length === 0) return null;

  return (
    <ListBoxWrapper>
      <div className="overflow-y-auto max-h-44 p-3 flex flex-col gap-2">
        {topics.map((topic) => (
          <div key={topic.id} className="flex items-center justify-between gap-2">
            <Link
              href={`/topics/${topic.name}`}
              className="text-sm font-medium hover:underline truncate"
            >
              {topic.name}
            </Link>
            <Badge variant="secondary" className="shrink-0">
              {topic._count.posts}
            </Badge>
          </div>
        ))}
      </div>
    </ListBoxWrapper>
  )
}