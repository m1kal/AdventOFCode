module Main where

main = do input <- readFile "day18.txt"
          let numbers = map readline $ lines input
              p2 = concat $ map (\x -> map (\y -> magnitude $ simplify $ add x y ) $ filter (\y -> x/=y) numbers) numbers
            in
              do
                print $ magnitude $ homework $ numbers
                print $ maximum p2

data Node = O | C | V Int deriving ( Eq, Show)

homework input = foldl1 (\acc x -> simplify (add acc x)) input

readline :: String -> [Node]
readline l | l == [] = []
           | head l == '[' = O:(readline $ tail l)
           | head l == ']' = C:(readline $ tail l)
           | head l == ',' = (readline $ tail l)
           | otherwise = (V (read $ take 1 l)):(readline $ tail l)

magnitude :: [Node] -> Int
magnitude input | length input == 1 = v 
                | otherwise = 3*(magnitude (tail (take s input))) + 2*(magnitude (init (drop s input)))
                  where
                  V v = head input
                  s = splitPoint input 0 0

splitPoint :: [Node] -> Int -> Int -> Int
splitPoint input level idx | length input < 2 = idx
                           | level == 0 && (input !! 1) /= O = 2
                           | level == 0 = splitPoint (drop 2 input) 2 2
                           | level == 1 && head input /= C = idx
                           | head input == C = splitPoint (tail input) (level - 1) (idx + 1)
                           | head input == O = splitPoint (tail input) (level + 1) (idx + 1)
                           | otherwise = splitPoint (tail input) level (idx + 1)
                           

add :: [Node] -> [Node] -> [Node]
add n1 n2 = [O]++n1++n2++[C]

simplify :: [Node] -> [Node]
simplify input | canExplode = simplify $ explode input e
               | canSplit = simplify $ split input s
               | otherwise = input
                 where
                 canExplode =  (findExplode input 0 0) /= Nothing
                 canSplit = (findSplit input 0) /= Nothing
                 Just e = findExplode input 0 0
                 Just s = findSplit input 0

findSplit :: [Node] -> Int -> Maybe Int
findSplit input idx | input == [] = Nothing
                    | otherwise = case (head input) of
                                       V v -> if v > 9 then Just idx else findSplit (tail input) (idx + 1)
                                       _ -> findSplit (tail input) (idx + 1)

split :: [Node] -> Int -> [Node]
split input idx = (take idx input) ++ sv ++ (drop (idx + 1) input)
                  where
                  V v = head $ drop idx input
                  sv = O : V (quot v 2) : V (quot (v + 1) 2) : C : []

findExplode :: [Node] -> Int -> Int -> Maybe Int
findExplode input level idx | input == [] = Nothing
                        | head input == O && level == 4 = Just idx
                        | head input == O = findExplode (tail input) (level + 1) (idx + 1)
                        | head input == C = findExplode (tail input) (level - 1) (idx + 1)
                        | otherwise = findExplode (tail input) level (idx + 1)


explode :: [Node] -> Int -> [Node]
explode input idx = s1 ++ [V 0] ++ s3
                    where
                    l = take idx input
                    [V v1, V v2] = take 2 $ drop (idx+1) input
                    r = drop (idx + 4) input
                    s1 = reverse $ replace v1 $ reverse l 
                    s3 = replace v2 r

replace :: Int -> [Node] -> [Node]
replace v [] = []
replace v input = case (head input) of
                    O -> O : (replace v $ tail input)
                    C -> C : (replace v $ tail input)
                    V a -> (V (a+v)) : ( tail input)

