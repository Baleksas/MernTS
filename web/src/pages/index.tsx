import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Layout from "../components/Layout";
import { NavBar } from "../components/NavBar";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  usePostsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";
import UpdootSection from "../components/UpdootSection";

function PostBox({ p, ...rest }) {
  const [, deletePost] = useDeletePostMutation();
  return (
    <Flex p={5} shadow="md" borderWidth="1px" {...rest}>
      <UpdootSection post={p} />
      <Box flex={1}>
        <NextLink href="/post/[id]" as={`/post/${p.id}`}>
          <Link>
            <Heading fontSize="xl">{p.title}</Heading>
          </Link>
        </NextLink>
        <Text>posted by {p.creator.username}</Text>
        <Flex align={"center"}>
          <Text flex={1} mt={4}>
            {p.textSnippet}
          </Text>
          <IconButton
            ml={"auto"}
            onClick={() => {
              deletePost({ id: p.id });
            }}
            aria-label="Delete post"
            size="24px"
            p={2}
            colorScheme={"red"}
            icon={<DeleteIcon />}
          />
        </Flex>
      </Box>
    </Flex>
  );
}
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  let [{ data, fetching }] = usePostsQuery({
    variables,
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
      <br />
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.posts.map((p) =>
            !p ? null : <PostBox p={p} key={p.id} />
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
