import styles from './Media.module.css';
import { useEffect, useState } from 'react';
import { ProfileRequests } from '../../../services/ProfileRequests';
import LoadingSpinner from '../../../components/ui/LoadingSpinner/LoadingSpinner';
import { useParams } from 'react-router-dom';
import InfoBlock from '../../../components/ui/InfoBlock/InfoBlock';

function Media() {
  const userTag = useParams().tag;
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const media = await ProfileRequests.getMediaByUserTag(userTag);

      setMedia(media);
      setIsLoading(false);
    };
    fetchPosts();
  }, [userTag]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {media.length == 0 && (
        <InfoBlock
          title="No media yet"
          text="Media files from posts will be displayed here"
        />
      )}
      {media.map((item) => (
        <img key={media.fileId} src={item.file} />
      ))}
    </>
  );
}

export default Media;
