import { Helmet } from 'react-helmet';

/**
 * Component for setting the meta tags for the app
 * @param {Object} props - props object
 * @returns {JSX.Element} AppMeta component
 */
export default function AppMeta(props) {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name='description' content={props.description} />
      <meta name='tags' content={props.tags} />
    </Helmet>
  );
}
