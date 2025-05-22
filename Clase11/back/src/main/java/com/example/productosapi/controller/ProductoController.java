package com.example.productosapi.controller;

import com.example.productosapi.model.Producto;
import com.example.productosapi.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    @Autowired
    private FirebaseService firebaseService;

    @GetMapping
    public CompletableFuture<ResponseEntity<List<Producto>>> getAllProductos() {
        return firebaseService.getAllProductos()
                .thenApply(ResponseEntity::ok)
                .exceptionally(throwable -> ResponseEntity.internalServerError().build());
    }

    @PostMapping
    public CompletableFuture<ResponseEntity<Producto>> createProducto(@RequestBody Producto producto) {
        return firebaseService.createProducto(producto)
                .thenApply(ResponseEntity::ok)
                .exceptionally(throwable -> ResponseEntity.internalServerError().build());
    }

    @PutMapping("/{id}")
    public CompletableFuture<ResponseEntity<Producto>> updateProducto(
            @PathVariable String id,
            @RequestBody Producto producto) {
        return firebaseService.updateProducto(id, producto)
                .thenApply(ResponseEntity::ok)
                .exceptionally(throwable -> ResponseEntity.internalServerError().build());
    }

    @DeleteMapping("/{id}")
    public CompletableFuture<ResponseEntity<Object>> deleteProducto(@PathVariable String id) {
        return firebaseService.deleteProducto(id)
                .thenApply(v -> ResponseEntity.ok().build())
                .exceptionally(throwable -> ResponseEntity.internalServerError().build());
    }
} 