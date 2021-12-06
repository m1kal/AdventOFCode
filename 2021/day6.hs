module Main where

main = do input <- readFile "day6.txt"
          let fish = read ("[" ++ input ++ "]") :: [Int]
              counts = map (\timer -> length $ filter (timer ==) fish)  [0..8] in
            do
              print $ sum $ iterate day [0,1,1,2,1,0,0,0,0] !! 80
              print $ sum $ iterate day counts !! 80
              print $ sum $ iterate day [0,1,1,2,1,0,0,0,0] !! 256
              print $ sum $ iterate day counts !! 256

day :: [Int] -> [Int]
day [x0,x1,x2,x3,x4,x5,x6,x7,x8] = [x1,x2,x3,x4,x5,x6,x7+x0,x8,x0]

