export const testTree = {
  children: [
    {
      name: 'foo',
      children: [
        {
          name: 'foo_dir',
          children: [
            {
              name: 'foo_dir2',
              children: [
                {
                  name: 'foo.txt',
                  children: [],
                },
                {
                  name: 'foobar.md',
                },
              ],
            },
            {
              name: 'foo_file',
            },
            {
              name: 'foo_dir3',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'bar',
      children: [
        {
          name: 'bar_file',
        },
      ],
    },
    {
      name: 'baz',
      children: [],
    },
    {
      name: 'barbaz',
    },
  ],
};
