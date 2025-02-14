<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // 允许跨域请求
header("Access-Control-Allow-Methods: GET, POST");

// 伪数据库数据
$data = [
    ["id" => 1, "name" => "苹果", "price" => 5],
    ["id" => 2, "name" => "香蕉", "price" => 3],
    ["id" => 3, "name" => "橘子", "price" => 4]
];

// 获取参数
$action = $_GET['action'] ?? 'list';

// 处理不同请求
if ($action === 'list') {
    echo json_encode(["status" => "success", "data" => $data]);
} elseif ($action === 'detail' && isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    $item = array_filter($data, fn($d) => $d['id'] === $id);
    echo json_encode(["status" => "success", "data" => array_values($item)]);
} else {
    echo json_encode(["status" => "error", "message" => "无效请求"]);
}
?>

