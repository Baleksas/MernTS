import { Alert, AlertIcon, Box, Button, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import NextLink from "next/link";
import Layout from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { AlertMessage } from "../../components/AlertMessage";

const Post = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>No post with id: {router.query.id} found</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <div>{data.post.text}</div>
      <NextLink href="/">
        <Button as={Link}>Back</Button>
      </NextLink>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
