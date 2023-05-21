import { Helmet } from 'react-helmet';

export default function AppMeta(props) {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name='description' content={props.description} />
      <meta name='tags' content={props.tags} />
    </Helmet>
  );
}
