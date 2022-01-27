module Main where
import Debug.Trace
main = do input <- readFile "day16.txt"
          let
            b = concat $ map bits input
            in
              do
                print $ versions $ fst $ parsePacket b
                print $ eval $ fst $ parsePacket b

bits '0' = [0,0,0,0]
bits '1' = [0,0,0,1]
bits '2' = [0,0,1,0]
bits '3' = [0,0,1,1]
bits '4' = [0,1,0,0]
bits '5' = [0,1,0,1]
bits '6' = [0,1,1,0]
bits '7' = [0,1,1,1]
bits '8' = [1,0,0,0]
bits '9' = [1,0,0,1]
bits 'A' = [1,0,1,0]
bits 'B' = [1,0,1,1]
bits 'C' = [1,1,0,0]
bits 'D' = [1,1,0,1]
bits 'E' = [1,1,1,0]
bits 'F' = [1,1,1,1]
bits _ = []

data Packet = Packet {version :: [Int], t :: [Int], len :: Int, value :: [Int], children :: [Packet]} deriving Show

parsePacket :: [Int] -> (Packet, [Int])
parsePacket d | take 3 (drop 3 d) == [1,0,0] =  (parseSimplePacket d)
              | head (drop 6 d) == 0 = (parseOp1 d)
              | otherwise = (parseOp2 d)

parseSimplePacket :: [Int] -> (Packet, [Int])
parseSimplePacket d = (Packet (take 3 d) (take 3 (drop 3 d)) 0 p [],dd) where [p,dd] = (parseValue (drop 6 d))

parseOp1 d = (Packet (take 3 d) (take 3 (drop 3 d)) len [] (parseAllPackets (take len (drop (3+3+1+15) d))), dd)
             where
             len = bin2dec (take 15 (drop (3+3+1) d))
             dd = drop (3+3+1+15 + len) d
parseOp2 d = (Packet (take 3 d) (take 3 (drop 3 d)) (-len) [] pp, dd)
             where
             len = bin2dec (take 11 (drop (3+3+1) d))
             (pp,dd) = parseNPackets len (drop (3+3+1+11) d)

parseNPackets :: Int -> [Int] -> ([Packet], [Int])
parseNPackets n d | n == 0 = ([],d)
                  | n == 1 = ([p1], d1)
                  | otherwise = (p1:pp,dd)
                                where
                                (p1,d1) = parsePacket d
                                (pp,dd) = parseNPackets (n-1) d1

parseAllPackets d | length d < 6 = []
                  | otherwise =  ((fst x) : (parseAllPackets (snd x))) where x = parsePacket d

parseValue :: [Int] -> [[Int]]
parseValue v | length v < 5 = [[-100000000], []]
             | head v == 0 = [take 4 (tail v), drop 5 v]
             | otherwise = [take 4 (tail v) ++ vv, d] where [vv,d] = parseValue (drop 5 v)

bin2dec :: [Int] -> Int
bin2dec v = foldl1 (\acc x -> acc * 2 + x) v

readVersion d | length d < 6 = 0
              | otherwise = (bin2dec (take 3 d)) + readVersion (nextHdr d)

nextHdr d | take 3 (drop 3 d) == [1,0,0] = endVal (drop 6 d)
          | head (drop 6 d) == 0 = drop (3+3+1+15) d
          | otherwise = drop (3+3+1+11) d

endVal d | head d == 0 = drop 5 d
         | otherwise = endVal (drop 5 d)


versions :: Packet -> Int
versions p = (bin2dec ( version p)) + (sum $ map versions (children p))

eval p = case t p of
           [1,0,0] -> bin2dec (value p)
           [0,0,0] -> sum $ map eval $ children p
           [0,0,1] -> product $ map eval $ children p
           [0,1,0] -> minimum $ map eval $ children p
           [0,1,1] -> maximum $ map eval $ children p
           [1,0,1] -> if head x > last x then 1 else 0
           [1,1,0] -> if head x < last x then 1 else 0
           [1,1,1] -> if head x == last x then 1 else 0
         where x = map eval $ children p
