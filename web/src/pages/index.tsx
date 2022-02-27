import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { NavBar } from "../components/NavBar";
import { useCreatePostMutation, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function PostBox({ title, desc = "N/A", ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}
const Index = () => {
  let [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  if (!data && !fetching) {
    return (
      <Layout>
        <Alert align="center">
          <AlertIcon></AlertIcon>
          <AlertTitle>Error.</AlertTitle>
          <AlertDescription> Something went wrong! </AlertDescription>
        </Alert>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>QuickPost</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <PostBox title={p.title} desc={p.textSnippet} key={p.id} />
          ))}
        </Stack>
      )}
      {data && (
        <Flex>
          <Button isLoading={fetching} m="auto" my={8}>
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
