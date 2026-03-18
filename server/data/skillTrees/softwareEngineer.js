module.exports = {
  role: "Software Engineer",

  sections: [

    // ========================= DSA =========================
    {
      title: "Data Structures & Algorithms",
      skills: [

        {
  topic: "Arrays",

  levels: [

    {
      name: "Basics",

      explanation:
        "Arrays store elements in contiguous memory locations and allow constant time access using indices.",

      keyIdeas: [
        "Index based access O(1)",
        "Elements stored in continuous memory",
        "Useful for iteration and searching"
      ],

      patterns: [
        "Linear scan",
        "Prefix computation",
        "Two pointer techniques"
      ],

      example:
        "Find the maximum element in an array by scanning all elements.",

      problems: [
        {
          title: "Two Sum",
          link: "https://leetcode.com/problems/two-sum/",
          difficulty: "Easy"
        },
        {
          title: "Best Time to Buy and Sell Stock",
          link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
          difficulty: "Easy"
        }
      ],

      tips: [
        "Always check array boundaries.",
        "Think about time complexity when scanning arrays."
      ]
    },

    {
      name: "Prefix Sum",

      explanation:
        "Prefix sums allow efficient range sum queries by precomputing cumulative sums.",

      keyIdeas: [
        "Precompute cumulative sums",
        "Answer range queries in O(1)"
      ],

      patterns: [
        "Range sum queries",
        "Subarray sum problems"
      ],

      example:
        "Find sum of elements between index L and R using prefix array.",

      problems: [
        {
          title: "Range Sum Query",
          link: "https://leetcode.com/problems/range-sum-query-immutable/",
          difficulty: "Easy"
        },
        {
          title: "Subarray Sum Equals K",
          link: "https://leetcode.com/problems/subarray-sum-equals-k/",
          difficulty: "Medium"
        }
      ],

      tips: [
        "Prefix arrays reduce repeated computation.",
        "Useful for competitive programming."
      ]
    },

    {
      name: "Sliding Window",

      explanation:
        "Sliding window technique optimizes subarray problems by maintaining a window that expands or shrinks.",

      keyIdeas: [
        "Maintain left and right pointers",
        "Update window efficiently"
      ],

      patterns: [
        "Fixed size window",
        "Variable size window"
      ],

      example:
        "Find maximum sum subarray of size K.",

      problems: [
        {
          title: "Maximum Average Subarray I",
          link: "https://leetcode.com/problems/maximum-average-subarray-i/",
          difficulty: "Easy"
        },
        {
          title: "Longest Substring Without Repeating Characters",
          link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
          difficulty: "Medium"
        }
      ],

      tips: [
        "Avoid recalculating sums repeatedly.",
        "Use window expansion and contraction carefully."
      ]
    }

  ]
},
        {
  topic: "Strings",
  levels: [
    {
      name: "Basics",
      explanation: "Strings are sequences of characters used for text processing.",
      keyIdeas: [
        "Strings behave like character arrays",
        "Index based traversal",
        "Immutable in many languages"
      ],
      patterns: [
        "Character counting",
        "Substring traversal",
        "Palindrome checks"
      ],
      example: "Check if a string is palindrome.",
      problems: [
        {
          title: "Valid Palindrome",
          link: "https://leetcode.com/problems/valid-palindrome/",
          difficulty: "Easy"
        }
      ],
      tips: [
        "Be careful with character comparisons.",
        "Watch for case sensitivity."
      ]
    },

    {
      name: "Two Pointer Techniques",
      explanation: "Two pointers help process strings efficiently from both ends.",
      keyIdeas: [
        "Left and right pointer technique",
        "Useful for palindrome problems"
      ],
      patterns: [
        "Palindrome checks",
        "Substring expansion"
      ],
      example: "Check if string can become palindrome after removing one char.",
      problems: [
        {
          title: "Valid Palindrome II",
          link: "https://leetcode.com/problems/valid-palindrome-ii/",
          difficulty: "Easy"
        }
      ],
      tips: [
        "Move pointers carefully.",
        "Avoid unnecessary string creation."
      ]
    }
  ]
},

{
  topic: "Hashing",
  levels: [

    {
      name: "Hash Maps",
      explanation: "Hash maps store key-value pairs with constant lookup.",
      keyIdeas: [
        "Key value storage",
        "O(1) average lookup"
      ],
      patterns: [
        "Frequency counting",
        "Duplicate detection"
      ],
      example: "Count frequency of elements in array.",
      problems: [
        {
          title: "Two Sum",
          link: "https://leetcode.com/problems/two-sum/",
          difficulty: "Easy"
        }
      ],
      tips: ["Use unordered_map in C++."]
    },

    {
      name: "Set Based Problems",
      explanation: "Sets help track unique elements and detect duplicates.",
      keyIdeas: [
        "Unique element storage",
        "Fast membership checks"
      ],
      patterns: [
        "Duplicate detection",
        "Distinct element problems"
      ],
      example: "Check if array contains duplicates.",
      problems: [
        {
          title: "Contains Duplicate",
          link: "https://leetcode.com/problems/contains-duplicate/",
          difficulty: "Easy"
        }
      ],
      tips: ["Use unordered_set in C++."]
    }

  ]
},

{
  topic: "Linked List",
  levels: [

    {
      name: "Basics",
      explanation: "Linked list stores nodes connected with pointers.",
      keyIdeas: [
        "Node structure",
        "Next pointer"
      ],
      patterns: [
        "Traversal",
        "Insertion"
      ],
      example: "Traverse a linked list.",
      problems: [
        {
          title: "Reverse Linked List",
          link: "https://leetcode.com/problems/reverse-linked-list/",
          difficulty: "Easy"
        }
      ],
      tips: ["Always check null pointer."]
    },

    {
      name: "Cycle Detection",
      explanation: "Cycle detection identifies loops inside linked list.",
      keyIdeas: [
        "Floyd's cycle detection",
        "Fast and slow pointer"
      ],
      patterns: [
        "Two pointer technique"
      ],
      example: "Detect if linked list contains cycle.",
      problems: [
        {
          title: "Linked List Cycle",
          link: "https://leetcode.com/problems/linked-list-cycle/",
          difficulty: "Easy"
        }
      ],
      tips: ["Use slow and fast pointer."]
    }

  ]
},
{
  topic: "Stack",
  levels: [

    {
      name: "Basics",
      explanation: "Stack follows LIFO order.",
      keyIdeas: [
        "Push",
        "Pop",
        "Top element"
      ],
      patterns: [
        "Balanced parentheses",
        "Undo operations"
      ],
      example: "Check valid parentheses.",
      problems: [
        {
          title: "Valid Parentheses",
          link: "https://leetcode.com/problems/valid-parentheses/",
          difficulty: "Easy"
        }
      ],
      tips: ["Stacks help solve nested structure problems."]
    },

    {
      name: "Monotonic Stack",
      explanation: "Monotonic stack keeps elements in sorted order to solve next greater/smaller problems.",
      keyIdeas: [
        "Maintain increasing/decreasing order",
        "Useful in range queries"
      ],
      patterns: [
        "Next greater element",
        "Histogram problems"
      ],
      example: "Find next greater element.",
      problems: [
        {
          title: "Next Greater Element I",
          link: "https://leetcode.com/problems/next-greater-element-i/",
          difficulty: "Easy"
        }
      ],
      tips: ["Pop elements that break monotonic property."]
    }

  ]
},

{
  topic: "Queue",
  levels: [
    {
      name: "Basics",
      explanation: "Queue follows First In First Out (FIFO).",
      keyIdeas: [
        "Enqueue and dequeue",
        "Used in BFS traversal"
      ],
      patterns: [
        "Level order traversal",
        "Task scheduling"
      ],
      example: "BFS traversal in graphs.",
      problems: [
        {
          title: "Implement Queue using Stacks",
          link: "https://leetcode.com/problems/implement-queue-using-stacks/",
          difficulty: "Easy"
        }
      ],
      tips: [
        "Queues are useful in graph traversal."
      ]
    }
  ]
},

{
  topic: "Binary Search",
  levels: [
    {
      name: "Classic Binary Search",
      explanation: "Binary search finds an element in sorted array in O(log n).",
      keyIdeas: [
        "Divide search space in half",
        "Requires sorted array"
      ],
      patterns: [
        "Search in sorted array",
        "Lower bound / upper bound"
      ],
      example: "Find element in sorted array.",
      problems: [
        {
          title: "Binary Search",
          link: "https://leetcode.com/problems/binary-search/",
          difficulty: "Easy"
        }
      ],
      tips: [
        "Avoid overflow in mid calculation."
      ]
    }
  ]
},

{
  topic: "Trees",
  levels: [

    {
      name: "Traversal",
      explanation: "Tree traversal visits nodes using DFS or BFS.",
      keyIdeas: [
        "Inorder",
        "Preorder",
        "Postorder"
      ],
      patterns: [
        "Recursive traversal"
      ],
      example: "Inorder traversal of binary tree.",
      problems: [
        {
          title: "Binary Tree Inorder Traversal",
          link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
          difficulty: "Easy"
        }
      ],
      tips: ["Recursion works well for trees."]
    },

    {
      name: "Tree Depth & Diameter",
      explanation: "Tree depth is the longest path from root to leaf.",
      keyIdeas: [
        "Height of tree",
        "Diameter of tree"
      ],
      patterns: [
        "DFS recursion"
      ],
      example: "Find diameter of binary tree.",
      problems: [
        {
          title: "Diameter of Binary Tree",
          link: "https://leetcode.com/problems/diameter-of-binary-tree/",
          difficulty: "Easy"
        }
      ],
      tips: ["Use recursion and track max height."]
    }

  ]
},

{
  topic: "Graphs",
  levels: [

    {
      name: "Graph Traversal",
      explanation: "Graph traversal explores nodes using BFS or DFS.",
      keyIdeas: [
        "Visited array",
        "Adjacency list"
      ],
      patterns: [
        "Connected components",
        "Traversal problems"
      ],
      example: "DFS traversal.",
      problems: [
        {
          title: "Number of Islands",
          link: "https://leetcode.com/problems/number-of-islands/",
          difficulty: "Medium"
        }
      ],
      tips: ["Use recursion or stack."]
    },

    {
      name: "Shortest Path",
      explanation: "Shortest path algorithms find minimum distance between nodes.",
      keyIdeas: [
        "Dijkstra algorithm",
        "BFS shortest path"
      ],
      patterns: [
        "Weighted graphs",
        "Unweighted graphs"
      ],
      example: "Shortest path using Dijkstra.",
      problems: [
        {
          title: "Network Delay Time",
          link: "https://leetcode.com/problems/network-delay-time/",
          difficulty: "Medium"
        }
      ],
      tips: ["Use priority queue for weighted graphs."]
    }

  ]
},

{
  topic: "Dynamic Programming",
  levels: [

    {
      name: "Memoization",
      explanation: "Memoization stores results of subproblems to avoid recomputation.",
      keyIdeas: [
        "Top-down dynamic programming",
        "Recursive solution with cache"
      ],
      patterns: [
        "Fibonacci",
        "Climbing stairs"
      ],
      example: "Memoized Fibonacci solution.",
      problems: [
        {
          title: "Climbing Stairs",
          link: "https://leetcode.com/problems/climbing-stairs/",
          difficulty: "Easy"
        }
      ],
      tips: ["Use hash map or DP array for caching."]
    },

    {
      name: "Tabulation",
      explanation: "Tabulation builds solutions bottom-up using iteration.",
      keyIdeas: [
        "Bottom-up DP",
        "Iterative solution"
      ],
      patterns: [
        "DP table",
        "State transitions"
      ],
      example: "Bottom-up Fibonacci.",
      problems: [
        {
          title: "Coin Change",
          link: "https://leetcode.com/problems/coin-change/",
          difficulty: "Medium"
        }
      ],
      tips: ["Always define state and transition."]
    }

  ]
},
{
  topic: "Greedy Algorithms",
  levels: [
    {
      name: "Greedy Basics",
      explanation: "Greedy algorithms make locally optimal choices.",
      keyIdeas: [
        "Local optimum",
        "Global optimum"
      ],
      patterns: [
        "Activity selection",
        "Interval scheduling"
      ],
      example: "Minimum number of coins.",
      problems: [
        {
          title: "Assign Cookies",
          link: "https://leetcode.com/problems/assign-cookies/",
          difficulty: "Easy"
        }
      ],
      tips: [
        "Sort inputs before applying greedy."
      ]
    }
  ]
},

        {
  topic: "Recursion",
  levels: [

    {
      name: "Basics",
      explanation: "Recursion is a technique where a function calls itself.",
      keyIdeas: [
        "Base case",
        "Recursive case"
      ],
      patterns: [
        "Tree recursion",
        "Divide and conquer"
      ],
      example: "Factorial using recursion.",
      problems: [
        {
          title: "Factorial",
          link: "https://leetcode.com/problems/climbing-stairs/",
          difficulty: "Easy"
        }
      ],
      tips: [
        "Always define base condition."
      ]
    },

    {
      name: "Backtracking",
      explanation: "Backtracking explores all possible solutions recursively.",
      keyIdeas: [
        "Decision tree",
        "Undo choice"
      ],
      patterns: [
        "Permutations",
        "Subsets"
      ],
      example: "Generate all permutations of array.",
      problems: [
        {
          title: "Permutations",
          link: "https://leetcode.com/problems/permutations/",
          difficulty: "Medium"
        }
      ],
      tips: [
        "Backtrack after exploring path."
      ]
    }

  ]
},



        {
  topic: "Heap / Priority Queue",
  levels: [

    {
      name: "Heap Basics",
      explanation: "Heap is a complete binary tree with heap property.",
      keyIdeas: [
        "Min heap",
        "Max heap"
      ],
      patterns: [
        "Top K problems"
      ],
      example: "Find K largest elements.",
      problems: [
        {
          title: "Kth Largest Element in Array",
          link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
          difficulty: "Medium"
        }
      ],
      tips: [
        "Use priority_queue in C++."
      ]
    }

  ]
},



        {
  topic: "Bit Manipulation",
  levels: [

    {
      name: "Bitwise Operators",
      explanation: "Bit manipulation uses AND, OR, XOR to operate on bits.",
      keyIdeas: [
        "Bit masking",
        "Shifting bits"
      ],
      patterns: [
        "Power of two",
        "Subset generation"
      ],
      example: "Check if number is power of 2.",
      problems: [
        {
          title: "Single Number",
          link: "https://leetcode.com/problems/single-number/",
          difficulty: "Easy"
        }
      ],
      tips: [
        "XOR cancels equal numbers."
      ]
    }

  ]
},

      ]
    },

    // ========================= CORE CS =========================
    {
      title: "Core Computer Science",

      skills: [

        {
  topic: "Operating Systems",
  levels: [

    {
      name: "Processes & Threads",
      explanation: "Processes represent running programs while threads are lightweight units inside processes.",
      keyIdeas: [
        "Process vs thread",
        "Context switching",
        "Multithreading"
      ],
      patterns: [],
      example: "Explain how browser tabs run multiple threads.",
      problems: [],
      tips: [
        "Threads share memory while processes do not."
      ]
    },

    {
      name: "CPU Scheduling",
      explanation: "CPU scheduling algorithms decide which process gets CPU time.",
      keyIdeas: [
        "FCFS",
        "Shortest Job First",
        "Round Robin"
      ],
      patterns: [],
      example: "Round Robin scheduling example.",
      problems: [],
      tips: [
        "Scheduling optimizes CPU utilization."
      ]
    },

    {
      name: "Deadlocks",
      explanation: "Deadlock occurs when processes wait indefinitely for resources held by each other.",
      keyIdeas: [
        "Mutual exclusion",
        "Hold and wait",
        "No preemption",
        "Circular wait"
      ],
      patterns: [],
      example: "Two processes waiting for each other's lock.",
      problems: [],
      tips: [
        "Break one of the four deadlock conditions to prevent it."
      ]
    }

  ]
},

        {
  topic: "DBMS",
  levels: [
    {
      name: "Normalization",
      explanation: "Normalization reduces redundancy in relational databases.",
      keyIdeas: [
        "1NF",
        "2NF",
        "3NF"
      ],
      patterns: [],
      example: "Convert table to 3NF.",
      problems: [],
      tips: ["Break tables logically."]
    },
    {
      name: "Database Basics",
      explanation: "DBMS manages structured data using tables and relations.",
      keyIdeas: [
        "Tables",
        "Primary keys",
        "Relationships"
      ],
      patterns: [],
      example: "Design a student database.",
      problems: [],
      tips: ["Understand relational models."]
    },

    {
      name: "SQL Joins",
      explanation: "SQL joins combine rows from multiple tables.",
      keyIdeas: [
        "Inner join",
        "Left join",
        "Right join"
      ],
      patterns: [],
      example: "Join student and marks tables.",
      problems: [],
      tips: ["Always use correct join condition."]
    }

  ]
},

        {
  topic: "Computer Networks",
  levels: [

    {
      name: "OSI Model",
      explanation: "OSI model divides network communication into 7 layers.",
      keyIdeas: [
        "Application layer",
        "Transport layer",
        "Network layer"
      ],
      patterns: [],
      example: "HTTP works at application layer.",
      problems: [],
      tips: [
        "Remember all 7 layers of OSI."
      ]
    },

    {
      name: "TCP vs UDP",
      explanation: "TCP and UDP are transport layer protocols used for communication between devices.",
      keyIdeas: [
        "TCP is connection oriented",
        "UDP is connectionless",
        "TCP ensures reliability"
      ],
      patterns: [],
      example: "Video streaming often uses UDP while file transfer uses TCP.",
      problems: [],
      tips: [
        "TCP = reliable but slower",
        "UDP = faster but no guarantee of delivery"
      ]
    }

  ]
}

      ]
    },

    // ========================= SYSTEM DESIGN =========================
    {
  title: "System Design Basics",

  skills: [

    {
      topic: "System Design",
      levels: [

        {
          name: "Scalability",
          explanation: "Scalability allows systems to handle increasing load.",
          keyIdeas: [
            "Horizontal scaling",
            "Vertical scaling"
          ],
          patterns: [
            "Load balancing"
          ],
          example: "Scale a web server using multiple instances.",
          problems: [],
          tips: [
            "Use distributed systems when traffic grows."
          ]
        },

        {
          name: "Caching",
          explanation: "Caching stores frequently accessed data in fast storage to reduce latency.",
          keyIdeas: [
            "Redis",
            "Memory caching",
            "Cache eviction strategies"
          ],
          patterns: [
            "Read-through cache",
            "Write-through cache"
          ],
          example: "Caching user sessions using Redis.",
          problems: [],
          tips: [
            "Always define cache invalidation strategy."
          ]
        }

      ]
    }

  ]
}

  ]
};